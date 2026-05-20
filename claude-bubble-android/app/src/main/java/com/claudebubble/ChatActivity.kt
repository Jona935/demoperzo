package com.claudebubble

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

// Kept only as entry point from MainActivity "Abrir Claude" button.
// The floating panel is managed entirely by FloatingBubbleService.
class ChatActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // If service is running, toggle the panel; otherwise just finish
        finish()
    }

    companion object {
        fun start(context: Context) {
            context.startActivity(
                Intent(context, ChatActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
            )
        }
    }
}
