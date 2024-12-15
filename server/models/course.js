import mongoose from 'mongoose';

// Course schema
const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: [true, 'Course name is required'],
        maxlength: [250, 'Course name should not exceed 250 characters'],
        trim: true
    },
    course_day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        required: [true, 'Course day is required']
    },
    course_code: {
        type: String,
        required: [true, 'Course code is required'],
        uppercase: true,
        validate: {
            validator: function (value) {
                return /^[A-Z]{2}[0-9]{4}$/.test(value);
            },
            message: 'Course code must be in the format: AB-1234'
        }
    },
    course_instructor: {
        type: String,
        required: [true, 'Course instructor is required'],
        maxlength: [250, 'Course instructor should not exceed 250 characters'],
        trim: true
    },
    course_semester: {
        type: String,
        validate: {
            validator: function (value) {
                return /^(Autumn|Winter|Spring|Summer)-([1-9]|10)$/.test(value);
            },
            message: 'Semester must be in the format: Fall-1'
        }
    },
    course_location: {
        type: String,
        maxlength: [250, 'Course location should not exceed 250 characters'],
        trim: true
    },
    course_cover_image: {
        type: String,
        maxlength: 250
    },
    course_description: {
        type: String,
        trim: true
    },
    course_time: {
        start: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
                },
                message: 'Invalid time format. Use HH:MM (24-hour format)'
            }
        },
        end: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
                },
                message: 'Invalid time format. Use HH:MM (24-hour format)'
            }
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
}, { 
    timestamps: true  // To add createdAt and updatedAt automatically
});


courseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
