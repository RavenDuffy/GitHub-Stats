import mongoose, { Schema } from 'mongoose'
import { GitStats } from '../../types'

export interface User extends mongoose.Document {
    username: string,
    avatar: string,
    accessToken: string | null,
    gitId: number | null,
    stats: GitStats | null
}

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    accessToken: { type: String, nullable: true},
    gitId: { type: Number, nullable: true },
    stats: { type: Schema.Types.Mixed, nullable: true }
})

UserSchema.index({ accessToken: 1, gitId: 1, _id: 1 }, { unique: true })

export const UserModel = mongoose.model<User>("User", UserSchema)