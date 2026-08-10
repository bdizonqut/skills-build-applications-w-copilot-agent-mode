import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        // Clear existing data
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await Leaderboard.deleteMany({});
        await Workout.deleteMany({});
        // Create users
        const users = await User.insertMany([
            {
                name: 'Alice Johnson',
                email: 'alice@octofit.com',
                password: 'hashedpassword123',
                bio: 'Fitness enthusiast and runner',
            },
            {
                name: 'Bob Smith',
                email: 'bob@octofit.com',
                password: 'hashedpassword123',
                bio: 'Gym lover and strength trainer',
            },
            {
                name: 'Carol Williams',
                email: 'carol@octofit.com',
                password: 'hashedpassword123',
                bio: 'Yoga and cycling fan',
            },
            {
                name: 'David Brown',
                email: 'david@octofit.com',
                password: 'hashedpassword123',
                bio: 'Swimming and cross-training',
            },
            {
                name: 'Emma Davis',
                email: 'emma@octofit.com',
                password: 'hashedpassword123',
                bio: 'Marathon runner',
            },
        ]);
        console.log(`Created ${users.length} users`);
        // Create teams
        const teams = await Team.insertMany([
            {
                name: 'Team Alpha',
                description: 'Competitive runners and endurance athletes',
                members: [users[0]._id, users[1]._id],
                createdBy: users[0]._id,
            },
            {
                name: 'Team Beta',
                description: 'Cross-training and functional fitness',
                members: [users[2]._id, users[3]._id, users[4]._id],
                createdBy: users[2]._id,
            },
        ]);
        console.log(`Created ${teams.length} teams`);
        // Update users with team IDs
        await User.updateMany({ _id: { $in: [users[0]._id, users[1]._id] } }, { teamId: teams[0]._id });
        await User.updateMany({ _id: { $in: [users[2]._id, users[3]._id, users[4]._id] } }, { teamId: teams[1]._id });
        // Create activities
        const activities = await Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'running',
                duration: 45,
                calories: 450,
                distance: 5.2,
                description: 'Morning run in the park',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[0]._id,
                type: 'gym',
                duration: 60,
                calories: 400,
                description: 'Upper body strength training',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[1]._id,
                type: 'gym',
                duration: 90,
                calories: 600,
                description: 'Full body workout',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[2]._id,
                type: 'cycling',
                duration: 60,
                calories: 500,
                distance: 15.3,
                description: 'Mountain biking trail',
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[2]._id,
                type: 'yoga',
                duration: 45,
                calories: 200,
                description: 'Vinyasa flow class',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[3]._id,
                type: 'swimming',
                duration: 50,
                calories: 450,
                distance: 1.5,
                description: 'Pool swimming laps',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[4]._id,
                type: 'running',
                duration: 120,
                calories: 1200,
                distance: 12.5,
                description: 'Long distance training run',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
        ]);
        console.log(`Created ${activities.length} activities`);
        // Create leaderboard entries
        const leaderboardEntries = await Leaderboard.insertMany([
            {
                userId: users[0]._id,
                teamId: teams[0]._id,
                totalCalories: 850,
                totalActivities: 2,
                totalDistance: 5.2,
                rank: 1,
            },
            {
                userId: users[1]._id,
                teamId: teams[0]._id,
                totalCalories: 600,
                totalActivities: 1,
                totalDistance: 0,
                rank: 2,
            },
            {
                userId: users[2]._id,
                teamId: teams[1]._id,
                totalCalories: 700,
                totalActivities: 2,
                totalDistance: 15.3,
                rank: 1,
            },
            {
                userId: users[3]._id,
                teamId: teams[1]._id,
                totalCalories: 450,
                totalActivities: 1,
                totalDistance: 1.5,
                rank: 2,
            },
            {
                userId: users[4]._id,
                teamId: teams[1]._id,
                totalCalories: 1200,
                totalActivities: 1,
                totalDistance: 12.5,
                rank: 3,
            },
        ]);
        console.log(`Created ${leaderboardEntries.length} leaderboard entries`);
        // Create workouts
        const workouts = await Workout.insertMany([
            {
                userId: users[0]._id,
                name: 'Beginner Running Program',
                description: 'Perfect for starting your running journey',
                difficulty: 'beginner',
                exercises: ['warm-up jog', '5k run', 'cool-down stretch'],
                duration: 45,
                targetMuscles: ['legs', 'cardiovascular'],
            },
            {
                userId: users[1]._id,
                name: 'Advanced Strength Training',
                description: 'Build muscle and increase strength',
                difficulty: 'advanced',
                exercises: ['bench press', 'deadlifts', 'squats', 'rows'],
                duration: 90,
                targetMuscles: ['chest', 'back', 'legs', 'core'],
            },
            {
                userId: users[2]._id,
                name: 'Beginner Yoga Flow',
                description: 'Flexibility and mindfulness for beginners',
                difficulty: 'beginner',
                exercises: ['sun salutation', 'downward dog', 'warrior pose', 'child pose'],
                duration: 45,
                targetMuscles: ['full body', 'flexibility'],
            },
            {
                userId: users[3]._id,
                name: 'Intermediate Swimming Routine',
                description: 'Build endurance and technique',
                difficulty: 'intermediate',
                exercises: ['freestyle', 'backstroke', 'breaststroke'],
                duration: 60,
                targetMuscles: ['full body', 'cardio'],
            },
            {
                userId: users[4]._id,
                name: 'Marathon Training Program',
                description: 'Prepare for a full marathon',
                difficulty: 'advanced',
                exercises: ['long runs', 'tempo runs', 'speed work', 'cross-training'],
                duration: 120,
                targetMuscles: ['legs', 'cardiovascular'],
            },
        ]);
        console.log(`Created ${workouts.length} workouts`);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
