import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.achievement.createMany({
        data: [
            {
                name: "First 1km",
                description: "Complete your first one kilometer",
                image: 'http://localhost:3000/assets/first1km.jpg'

            },
            {
                name: "Speed Run",
                description: "Run 100m within 15s",
                image: 'http://localhost:3000/assets/speedrun.jpg'

            },
            {
                name: "Total Distance",
                description: "You have run a total of 100m",
                image: 'http://localhost:3000/assets/totaldistance.jpg'
            },
            {
                name: "7 day-Streak",
                description: "Daily jogging routine",
                image: 'http://localhost:3000/assets/7streak.jpg'
            },
            {
                name: "Social Star",
                description: "Add 10 Friends",
                image: 'http://localhost:3000/assets/socialstar.jpg'

            },
            {
                name: "Calories Crusher",
                description: "Burn 500 calories",
                image: 'http://localhost:3000/assets/caloriescrusher.jpg'
            },
            {
                name: "Marathoner",
                description: "Run a total of 42 km (26.2 miles)",
                image: 'http://localhost:3000/assets/marathoner.jpg'

            },
            {
                name: "First Timer",
                description: "Complete your first run",
                image: 'http://localhost:3000/assets/1sttimer.jpg'

            }
        ]
    });
}
    
main().then( () => {
    console.log('Data seeded');
    prisma.$disconnect();
}).catch((e)=>{
    console.error(e);
    prisma.$disconnect();
    process.exit(1)
})