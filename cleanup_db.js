const fs = require('fs');
const path = require('path');

const filesToDelete = [
    'database/car_showroom.sql',
    'database/setup.sql',
    'database/create_activities.sql',
    'database/create_milestones.sql',
    'database/migration_variants.sql',
    'database/homepage_content.sql'
];

filesToDelete.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${file}`);
        } else {
            console.log(`File not found (already deleted): ${file}`);
        }
    } catch (err) {
        console.error(`Error deleting ${file}:`, err.message);
    }
});
