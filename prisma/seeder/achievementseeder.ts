import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.achievement.createMany({
        data: [
            {
                name: "First 1km",
                description: "Complete your first one kilometer",
                image: 'http://10.0.2.2:3000/assets/first1km.png'

            },
            {
                name: "Speed Run",
                description: "Run 100m within 15s",
                image: 'http://10.0.2.2:3000/assets/speedrun.png'

            },
            {
                name: "Total Distance",
                description: "You have run a total of 100m",
                image: 'http://10.0.2.2:3000/assets/totaldistance.png'
            },
            {
                name: "7 day-Streak",
                description: "Daily jogging routine",
                image: 'http://10.0.2.2:3000/assets/7streak.png'
            },
            {
                name: "Social Star",
                description: "Add 10 Friends",
                image: 'http://10.0.2.2:3000/assets/socialstar.png'

            },
            {
                name: "Calories Crusher",
                description: "Burn 500 calories",
                image: 'http://10.0.2.2:3000/assets/caloriescrusher.png'
            },
            {
                name: "Marathoner",
                description: "Run a total of 42 km (26.2 miles)",
                image: 'http://10.0.2.2:3000/assets/marathoner.png'

            },
            {
                name: "First Timer",
                description: "Complete your first run",
                image: 'http://10.0.2.2:3000/assets/1sttimer.png'

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