package com.claudebubble

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import coil.load

class ChatAdapter(private val messages: List<Message>) :
    RecyclerView.Adapter<ChatAdapter.VH>() {

    companion object {
        private const val VIEW_USER = 0
        private const val VIEW_ASSISTANT = 1
        private const val VIEW_ERROR = 2
    }

    override fun getItemViewType(position: Int) = when (messages[position].role) {
        Message.Role.USER -> VIEW_USER
        Message.Role.ASSISTANT -> VIEW_ASSISTANT
        Message.Role.ERROR -> VIEW_ERROR
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val layout = when (viewType) {
            VIEW_USER -> R.layout.item_message_user
            VIEW_ERROR -> R.layout.item_message_error
            else -> R.layout.item_message_assistant
        }
        return VH(LayoutInflater.from(parent.context).inflate(layout, parent, false))
    }

    override fun onBindViewHolder(holder: VH, position: Int) =
        holder.bind(messages[position])

    override fun getItemCount() = messages.size

    class VH(view: View) : RecyclerView.ViewHolder(view) {
        private val tvText: TextView? = view.findViewById(R.id.tvText)
        private val ivImage: ImageView? = view.findViewById(R.id.ivImage)

        fun bind(msg: Message) {
            tvText?.text = msg.text.ifBlank { null }
            tvText?.visibility = if (msg.text.isBlank()) View.GONE else View.VISIBLE

            if (ivImage != null) {
                if (msg.imageUri != null) {
                    ivImage.visibility = View.VISIBLE
                    ivImage.load(msg.imageUri)
                } else {
                    ivImage.visibility = View.GONE
                }
            }
        }
    }
}
