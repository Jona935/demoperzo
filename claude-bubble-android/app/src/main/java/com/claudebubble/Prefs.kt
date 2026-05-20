package com.claudebubble

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

object Prefs {
    private const val FILE_NAME = "claude_bubble_prefs"
    private const val KEY_API_KEY = "api_key"
    private const val KEY_SYSTEM_PROMPT = "system_prompt"
    private const val KEY_MODEL = "model"

    fun getApiKey(ctx: Context): String =
        getPrefs(ctx).getString(KEY_API_KEY, "") ?: ""

    fun setApiKey(ctx: Context, key: String) =
        getPrefs(ctx).edit().putString(KEY_API_KEY, key).apply()

    fun getSystemPrompt(ctx: Context): String =
        getPrefs(ctx).getString(KEY_SYSTEM_PROMPT, DEFAULT_SYSTEM) ?: DEFAULT_SYSTEM

    fun setSystemPrompt(ctx: Context, prompt: String) =
        getPrefs(ctx).edit().putString(KEY_SYSTEM_PROMPT, prompt).apply()

    fun getModel(ctx: Context): String =
        getPrefs(ctx).getString(KEY_MODEL, "claude-opus-4-5") ?: "claude-opus-4-5"

    fun setModel(ctx: Context, model: String) =
        getPrefs(ctx).edit().putString(KEY_MODEL, model).apply()

    private fun getPrefs(ctx: Context) = try {
        val masterKey = MasterKey.Builder(ctx)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        EncryptedSharedPreferences.create(
            ctx, FILE_NAME, masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    } catch (e: Exception) {
        // Fallback to regular prefs if encryption unavailable
        ctx.getSharedPreferences(FILE_NAME, Context.MODE_PRIVATE)
    }

    private const val DEFAULT_SYSTEM = """Eres un asistente IA accesible desde una burbuja flotante en el teléfono.
Responde de forma concisa y útil. Puedes analizar capturas de pantalla y responder preguntas sobre lo que el usuario está viendo."""
}
