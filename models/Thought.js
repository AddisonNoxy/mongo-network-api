const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /\w{1,280}/.test(v);
                }
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId },
        reactionBody: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /w{1,280}/.test(v)
                }
            }
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;