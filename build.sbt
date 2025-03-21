lazy val kacperfkorban = project.in(file("."))
  .settings(
    name := "Kacper Korban",
    scalaVersion := "3.6.3",
    Compile / doc / scalacOptions ++= Seq(
      "-siteroot", "docs",
      "-doc-root-content", "docs/rootdoc.md",
      "-social-links:github::https://github.com/KacperFKorban,twitter::https://x.com/KacperFKorban",
      "-Ygenerate-inkuire",
      "-author"
    )
  )
