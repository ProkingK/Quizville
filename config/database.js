import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/quizvilleDB')
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

export default mongoose;