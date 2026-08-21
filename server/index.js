import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  News Signal Analyzer Server running on port ${PORT}`);
  console.log(`  Health Check Endpoint : http://localhost:${PORT}/health`);
  console.log(`  Graph Analysis Endpoint: http://localhost:${PORT}/analyze (POST)`);
  console.log(`==================================================\n`);
});
