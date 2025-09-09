const { execSync } = require("child_process")

console.log("Running Jest tests...")

try {
  const result = execSync("npm test -- --verbose --no-coverage", {
    encoding: "utf8",
    stdio: "inherit",
  })
  console.log("Tests completed successfully!")
} catch (error) {
  console.error("Tests failed:", error.message)
  process.exit(1)
}
