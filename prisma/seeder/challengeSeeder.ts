import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.challenge.createMany({
        data: [
            {
                name: "Run For 15 Minutes",
                description: "Run for 15 minutes in a single run",
                image: 'http://10.0.2.2:3000/assets/15min.png'
            },
            {
                name: "Burn 50 kcal",
                description: "Burn 50 kcal in a single run",
                image: 'http://10.0.2.2:3000/assets/50kcal.png'
            },
            {
                name: "Run for 3 days consecutively",
                description: "Run for 3 days in a row",
                image: 'http://10.0.2.2:3000/assets/3days.png'
            },
            {
                name: "Complete a 2 km run",
                description: "Reach 2 km in a single run",
                image: 'http://10.0.2.2:3000/assets/2km.png'
            },

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