package com.claudebubble

import android.net.Uri

data class Message(
    val role: Role,
    val text: String,
    val imageUri: Uri? = null,
    val imageBase64: String? = null,
    val imageMimeType: String? = null
) {
    enum class Role { USER, ASSISTANT, ERROR }
}
