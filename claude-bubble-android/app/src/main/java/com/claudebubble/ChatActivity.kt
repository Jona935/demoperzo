package com.claudebubble

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.customtabs.CustomTabColorSchemeParams
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.content.ContextCompat

class ChatActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        openClaude()
        finish()
    }

    private fun openClaude() {
        val colorParams = CustomTabColorSchemeParams.Builder()
            .setToolbarColor(ContextCompat.getColor(this, R.color.claude_orange))
            .build()

        val displayHeight = resources.displayMetrics.heightPixels

        val intent = CustomTabsIntent.Builder()
            .setDefaultColorSchemeParams(colorParams)
            .setShowTitle(false)
            .setUrlBarHidingEnabled(true)
            // Open as bottom sheet covering ~80% of screen
            .setInitialActivityHeightPx((displayHeight * 0.82).toInt(),
                CustomTabsIntent.ACTIVITY_HEIGHT_ADJUSTABLE)
            .setToolbarCornerRadiusDp(16)
            .setShareState(CustomTabsIntent.SHARE_STATE_OFF)
            .setCloseButtonPosition(CustomTabsIntent.CLOSE_BUTTON_POSITION_END)
            .build()

        intent.launchUrl(this, Uri.parse("https://claude.ai/new"))
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
