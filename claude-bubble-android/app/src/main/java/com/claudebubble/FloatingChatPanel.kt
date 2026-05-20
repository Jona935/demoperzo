package com.claudebubble

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar

class FloatingChatPanel(private val context: Context) {

    private val wm = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    private val handler = Handler(Looper.getMainLooper())
    private var root: View? = null
    private var wv: WebView? = null

    var isVisible = false
        private set

    private val metrics get() = context.resources.displayMetrics

    fun show(onMinimize: () -> Unit, onClose: () -> Unit) {
        if (isVisible) return
        handler.post { attach(onMinimize, onClose) }
    }

    @SuppressLint("InflateParams", "SetJavaScriptEnabled", "ClickableViewAccessibility")
    private fun attach(onMinimize: () -> Unit, onClose: () -> Unit) {
        val view = LayoutInflater.from(context).inflate(R.layout.layout_chat_panel, null)

        val w = (metrics.widthPixels * 0.92).toInt()
        val h = (metrics.heightPixels * 0.80).toInt()

        val params = WindowManager.LayoutParams(
            w, h,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            // HARDWARE_ACCELERATED is required for WebView in overlays
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED or
                WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
                WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.CENTER
        }

        // Drag by title bar
        var px = params.x; var py = params.y
        var tx = 0f; var ty = 0f
        view.findViewById<View>(R.id.titleBar).setOnTouchListener { _, e ->
            when (e.action) {
                MotionEvent.ACTION_DOWN -> { px = params.x; py = params.y; tx = e.rawX; ty = e.rawY }
                MotionEvent.ACTION_MOVE -> {
                    params.x = (px + e.rawX - tx).toInt()
                    params.y = (py + e.rawY - ty).toInt()
                    runCatching { wm.updateViewLayout(view, params) }
                }
            }
            false
        }

        view.findViewById<View>(R.id.btnMinimize).setOnClickListener { hide(); onMinimize() }
        view.findViewById<View>(R.id.btnClose).setOnClickListener { hide(); onClose() }

        val webView = WebView(context).also { wv = it }
        val progress = view.findViewById<ProgressBar>(R.id.progressBar)
        view.findViewById<View>(R.id.btnReload).setOnClickListener { webView.reload() }

        // Replace the placeholder WebView in the layout with our instance
        val container = view.findViewById<android.widget.FrameLayout>(R.id.webViewContainer)
        container.addView(webView, android.widget.FrameLayout.LayoutParams(
            android.widget.FrameLayout.LayoutParams.MATCH_PARENT,
            android.widget.FrameLayout.LayoutParams.MATCH_PARENT
        ))

        setupWebView(webView, progress)

        wm.addView(view, params)
        root = view
        isVisible = true
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView(webView: WebView, progress: ProgressBar) {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            setSupportZoom(false)
            loadWithOverviewMode = true
            useWideViewPort = true
            // Chrome UA so sites don't restrict features
            userAgentString = "Mozilla/5.0 (Linux; Android 13; Pixel 7) " +
                "AppleWebKit/537.36 (KHTML, like Gecko) " +
                "Chrome/124.0.0.0 Mobile Safari/537.36"
        }

        android.webkit.CookieManager.getInstance().apply {
            setAcceptCookie(true)
            setAcceptThirdPartyCookies(webView, true)
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView, request: WebResourceRequest
            ): Boolean {
                val url = request.url.toString()
                val isGoogleAuth = url.contains("accounts.google.com") ||
                    url.contains("oauth2") ||
                    url.contains("auth.anthropic")
                return if (isGoogleAuth) {
                    context.startActivity(
                        Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        }
                    )
                    true
                } else false
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView, p: Int) {
                progress.progress = p
                progress.visibility = if (p < 100) View.VISIBLE else View.GONE
            }
        }

        webView.loadUrl("https://claude.ai/new")
    }

    fun hide() {
        handler.post {
            root?.let { runCatching { wm.removeView(it) } }
            root = null
            isVisible = false
        }
    }

    fun destroy() {
        hide()
        handler.post {
            wv?.apply { stopLoading(); destroy() }
            wv = null
        }
    }
}
