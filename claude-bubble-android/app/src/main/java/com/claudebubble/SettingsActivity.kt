package com.claudebubble

import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.claudebubble.databinding.ActivitySettingsBinding

class SettingsActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySettingsBinding

    private val models = listOf(
        "claude-opus-4-5",
        "claude-sonnet-4-5",
        "claude-haiku-4-5-20251001"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySettingsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.apply {
            title = "Configuración"
            setDisplayHomeAsUpEnabled(true)
        }

        setupModelSpinner()
        loadSettings()

        binding.btnSave.setOnClickListener { saveSettings() }
        binding.btnClearChat.setOnClickListener {
            Toast.makeText(this, "Historial de chat limpiado", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setupModelSpinner() {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, models)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.spinnerModel.adapter = adapter
    }

    private fun loadSettings() {
        val key = Prefs.getApiKey(this)
        // Show masked key
        binding.etApiKey.setText(if (key.isNotBlank()) "sk-ant-..." + key.takeLast(6) else "")
        binding.etApiKey.tag = key // store real key

        binding.etApiKey.setOnFocusChangeListener { _, hasFocus ->
            if (hasFocus && binding.etApiKey.text.toString().startsWith("sk-ant-...")) {
                binding.etApiKey.setText(binding.etApiKey.tag as? String ?: "")
            }
        }

        binding.etSystemPrompt.setText(Prefs.getSystemPrompt(this))

        val savedModel = Prefs.getModel(this)
        val idx = models.indexOf(savedModel)
        if (idx >= 0) binding.spinnerModel.setSelection(idx)
    }

    private fun saveSettings() {
        val keyInput = binding.etApiKey.text.toString().trim()
        val realKey = if (keyInput.startsWith("sk-ant-...")) {
            Prefs.getApiKey(this) // keep existing
        } else {
            keyInput
        }

        if (realKey.isBlank()) {
            binding.etApiKey.error = "La API Key no puede estar vacía"
            return
        }

        Prefs.setApiKey(this, realKey)
        Prefs.setSystemPrompt(this, binding.etSystemPrompt.text.toString())
        Prefs.setModel(this, models[binding.spinnerModel.selectedItemPosition])

        Toast.makeText(this, "Configuración guardada ✓", Toast.LENGTH_SHORT).show()
        finish()
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
