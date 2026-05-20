package com.claudebubble

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.net.Uri
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient

class FloatingChatPanel(private val context: Context) {

    private val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    private var panelView: View? = null
    private var webView: WebView? = null
    var isVisible = false
        private set

    private val metrics get() = context.resources.displayMetrics

    @SuppressLint("InflateParams", "SetJavaScriptEnabled", "ClickableViewAccessibility")
    fun show(onMinimize: () -> Unit, onClose: () -> Unit) {
        if (isVisible) return

        val view = LayoutInflater.from(context).inflate(R.layout.layout_chat_panel, null)

        val w = (metrics.widthPixels * 0.92).toInt()
        val h = (metrics.heightPixels * 0.80).toInt()

        val params = WindowManager.LayoutParams(
            w, h,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            // Focusable so keyboard works inside WebView
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
                WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH or
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.CENTER
            y = -(metrics.heightPixels * 0.05).toInt() // slightly above center
        }

        // Drag from title bar
        var dragX = 0; var dragY = 0
        var touchX = 0f; var touchY = 0f
        view.findViewById<View>(R.id.titleBar).setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    dragX = params.x; dragY = params.y
                    touchX = event.rawX; touchY = event.rawY
                }
                MotionEvent.ACTION_MOVE -> {
                    params.x = (dragX + event.rawX - touchX).toInt()
                    params.y = (dragY + event.rawY - touchY).toInt()
                    windowManager.updateViewLayout(view, params)
                }
            }
            false
        }

        view.findViewById<View>(R.id.btnMinimize).setOnClickListener {
            hide()
            onMinimize()
        }

        view.findViewById<View>(R.id.btnClose).setOnClickListener {
            hide()
            onClose()
        }

        val wv = view.findViewById<WebView>(R.id.webView)
        val progress = view.findViewById<View>(R.id.progressBar) as android.widget.ProgressBar

        view.findViewById<View>(R.id.btnReload).setOnClickListener {
            wv.reload()
        }

        setupWebView(wv, progress)
        webView = wv

        windowManager.addView(view, params)
        panelView = view
        isVisible = true
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView(wv: WebView, progress: android.widget.ProgressBar) {
        wv.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            setSupportZoom(false)
            loadWithOverviewMode = true
            useWideViewPort = true
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            // Identify as Chrome so Google login works
            userAgentString = "Mozilla/5.0 (Linux; Android 13; Pixel 7) " +
                "AppleWebKit/537.36 (KHTML, like Gecko) " +
                "Chrome/124.0.0.0 Mobile Safari/537.36"
        }

        android.webkit.CookieManager.getInstance().apply {
            setAcceptCookie(true)
            setAcceptThirdPartyCookies(wv, true)
        }

        wv.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView, request: WebResourceRequest
            ): Boolean {
                val url = request.url.toString()
                // Google OAuth must open in Chrome (WebView is blocked by Google)
                return if (url.contains("accounts.google.com") ||
                    url.contains("oauth2") ||
                    url.contains("auth.anthropic")) {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    }
                    context.startActivity(intent)
                    true
                } else {
                    false
                }
            }
        }

        wv.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView, newProgress: Int) {
                progress.progress = newProgress
                progress.visibility = if (newProgress < 100) View.VISIBLE else View.GONE
            }
        }

        wv.loadUrl("https://claude.ai/new")
    }

    fun hide() {
        panelView?.let {
            runCatching { windowManager.removeView(it) }
            panelView = null
        }
        isVisible = false
    }

    fun destroy() {
        hide()
        webView?.destroy()
        webView = null
    }
}
