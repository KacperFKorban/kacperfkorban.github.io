lazy val kacperfkorban = project.in(file("."))
  .settings(
    name := "Kacper F. Korban",
    scalaVersion := "3.6.3",
    Compile / doc / scalacOptions ++= Seq(
      "-siteroot", "docs",
      "-doc-root-content", "docs/rootdoc.md",
      "-social-links:github::https://github.com/KacperFKorban,twitter::https://x.com/KacperFKorban,custom::mailto:kacper.korban@epfl.ch::envelope-solid-full.svg::envelope-regular-full.svg",
      "-Ygenerate-inkuire",
      "-author"
    )
  )
