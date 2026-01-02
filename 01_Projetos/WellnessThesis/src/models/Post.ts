import mongoose, { Schema, model, models } from 'mongoose';

/**
 * Post Schema
 * Modelo central para o conteúdo do blog, otimizado para Marketing de Afiliados.
 * Inclui campos específicos para scripts do Google Ads e links de redirecionamento.
 */
const PostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image_url: { type: String },
  content: { type: String, required: true },
  cta_link: { type: String }, // Link para produto afiliado (ex: Mitolyn)
  ad_slots: {
    top: { type: String },    // Slot no topo da página
    sidebar: { type: String }, // Slot na barra lateral
    in_feed: { type: String }, // Slot sugestivo entre parágrafos
  }
}, { timestamps: true });

const Post = models.Post || model('Post', PostSchema);
export default Post;
