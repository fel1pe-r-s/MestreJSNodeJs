import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * Responsável por gerenciar os acessos administrativos.
 * A senha é criptografada automaticamente via hook pre-save.
 */
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin_painel_total'], default: 'admin_painel_total' },
}, { timestamps: true });

// Hash password before saving to ensure security according to SOLID principles
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = models.User || model('User', UserSchema);
export default User;
