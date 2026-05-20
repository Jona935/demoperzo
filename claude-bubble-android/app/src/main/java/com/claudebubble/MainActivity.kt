package com.claudebubble

import android.app.ActivityManager
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.claudebubble.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private val overlayPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) {
        if (Settings.canDrawOverlays(this)) {
            startBubbleService()
        } else {
            Toast.makeText(
                this,
                "Permiso requerido para mostrar la burbuja sobre otras apps",
                Toast.LENGTH_LONG
            ).show()
        }
    }

    private val notifPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) {
        checkAndStartBubble()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setupUI()
    }

    override fun onResume() {
        super.onResume()
        updateBubbleStatus()
    }

    private fun setupUI() {
        binding.btnStartBubble.setOnClickListener { checkAndStartBubble() }
        binding.btnStopBubble.setOnClickListener {
            stopService(Intent(this, FloatingBubbleService::class.java))
            updateBubbleStatus()
        }
        binding.btnOpenChat.setOnClickListener {
            startActivity(Intent(this, ChatActivity::class.java))
        }
    }

    private fun checkAndStartBubble() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) !=
                android.content.pm.PackageManager.PERMISSION_GRANTED
            ) {
                notifPermissionLauncher.launch(android.Manifest.permission.POST_NOTIFICATIONS)
                return
            }
        }

        if (!Settings.canDrawOverlays(this)) {
            AlertDialog.Builder(this)
                .setTitle("Permiso necesario")
                .setMessage(
                    "Para mostrar la burbuja flotante sobre otras apps, necesitamos el permiso " +
                    "\"Mostrar sobre otras apps\".\n\nToca OK para ir a la configuración."
                )
                .setPositiveButton("OK") { _, _ ->
                    overlayPermissionLauncher.launch(
                        Intent(
                            Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                            Uri.parse("package:$packageName")
                        )
                    )
                }
                .setNegativeButton("Cancelar", null)
                .show()
            return
        }

        startBubbleService()
    }

    private fun startBubbleService() {
        val intent = Intent(this, FloatingBubbleService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(intent)
        } else {
            startService(intent)
        }
        Toast.makeText(this, "¡Burbuja activada! Minimiza la app y el monito flotará.", Toast.LENGTH_LONG).show()
        updateBubbleStatus()
    }

    private fun updateBubbleStatus() {
        val running = isServiceRunning()
        binding.tvBubbleStatus.text = if (running) "Burbuja activa ●" else "Burbuja inactiva ○"
        binding.tvBubbleStatus.setTextColor(
            getColor(if (running) android.R.color.holo_green_dark else android.R.color.darker_gray)
        )
        binding.btnStartBubble.isEnabled = !running
        binding.btnStopBubble.isEnabled = running
    }

    private fun isServiceRunning(): Boolean {
        val manager = getSystemService(ACTIVITY_SERVICE) as ActivityManager
        @Suppress("DEPRECATION")
        return manager.getRunningServices(Int.MAX_VALUE).any {
            it.service.className == FloatingBubbleService::class.java.name
        }
    }
}
