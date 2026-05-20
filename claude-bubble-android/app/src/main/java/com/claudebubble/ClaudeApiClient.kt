package com.claudebubble

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class ClaudeApiClient(private val apiKey: String) {

    private val client = OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()

    private val JSON = "application/json; charset=utf-8".toMediaType()

    suspend fun sendMessage(history: List<Message>, systemPrompt: String? = null): Result<String> =
        withContext(Dispatchers.IO) {
            runCatching {
                val messages = JSONArray()
                history.forEach { msg ->
                    if (msg.role == Message.Role.ERROR) return@forEach
                    val contentArray = JSONArray()

                    // Add image if present
                    if (msg.imageBase64 != null && msg.imageMimeType != null) {
                        val imageSource = JSONObject().apply {
                            put("type", "base64")
                            put("media_type", msg.imageMimeType)
                            put("data", msg.imageBase64)
                        }
                        contentArray.put(JSONObject().apply {
                            put("type", "image")
                            put("source", imageSource)
                        })
                    }

                    // Add text
                    if (msg.text.isNotBlank()) {
                        contentArray.put(JSONObject().apply {
                            put("type", "text")
                            put("text", msg.text)
                        })
                    }

                    messages.put(JSONObject().apply {
                        put("role", if (msg.role == Message.Role.USER) "user" else "assistant")
                        put("content", contentArray)
                    })
                }

                val body = JSONObject().apply {
                    put("model", "claude-opus-4-5")
                    put("max_tokens", 4096)
                    if (!systemPrompt.isNullOrBlank()) put("system", systemPrompt)
                    put("messages", messages)
                }

                val request = Request.Builder()
                    .url("https://api.anthropic.com/v1/messages")
                    .addHeader("x-api-key", apiKey)
                    .addHeader("anthropic-version", "2023-06-01")
                    .post(body.toString().toRequestBody(JSON))
                    .build()

                val response = client.newCall(request).execute()
                val responseBody = response.body?.string() ?: error("Empty response")

                if (!response.isSuccessful) {
                    val errJson = runCatching { JSONObject(responseBody) }.getOrNull()
                    val errMsg = errJson?.optJSONObject("error")?.optString("message") ?: responseBody
                    error("API error ${response.code}: $errMsg")
                }

                val json = JSONObject(responseBody)
                json.getJSONArray("content")
                    .getJSONObject(0)
                    .getString("text")
            }
        }
}
