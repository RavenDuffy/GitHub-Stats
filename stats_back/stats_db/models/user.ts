import mongoose from 'mongoose'

export interface User extends mongoose.Document {
    username: string,
    gitUsername: string,
    displayName: string,
    avatar: string,
    accessToken: string | null
    password: string
}

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    gitUsername: { type: String, required: true },
    displayName: { type: String, required: true },
    avatar: { type: String, required: true },
    accessToken: { type: String, nullable: true},
    password: { type: String, required: true }
})

UserSchema.index({ accessToken: 1, username: 1 }, { unique: true })

export const UserModel = mongoose.model<User>("User", UserSchema)