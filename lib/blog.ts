import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { BlogPost } from "@/data/resume"

const postsDirectory = path.join(process.cwd(), "content/posts")

// Helper to check if directory exists to avoid crashes if you haven't created it yet
function ensureDirectoryExists() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

function extractSummary(contentHtml: string): string {
  // Remove HTML tags
  const text = contentHtml.replace(/<[^>]*>?/gm, "")
  // Replace multiple spaces/newlines with single space
  const cleanText = text.replace(/\s+/g, " ").trim()
  const words = cleanText.split(" ")
  if (words.length <= 100) return cleanText
  return words.slice(0, 100).join(" ") + "..."
}

export async function getSortedPostsData(): Promise<BlogPost[]> {
  // Ensure the directory exists so we don't crash on first run
  ensureDirectoryExists()

  // Get file names under /content/posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "")

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Use remark to convert markdown into HTML string
      const processedContent = await remark().use(html).process(matterResult.content)
      const contentHtml = processedContent.toString()

      // Combine the data with the id and contentHtml
      return {
        id,
        title: matterResult.data.title || "Untitled Post",
        date: matterResult.data.date || new Date().toISOString(),
        category: matterResult.data.category || "General",
        summary: matterResult.data.excerpt || matterResult.data.summary || extractSummary(contentHtml),
        content: contentHtml,
      } as BlogPost
    }),
  )

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Helper function to get all post IDs for static generation
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    }
  })
}

// Helper function to get a single post data by ID
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const matterResult = matter(fileContents)

  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    title: matterResult.data.title || "Untitled Post",
    date: matterResult.data.date || new Date().toISOString(),
    category: matterResult.data.category || "General",
    summary: matterResult.data.excerpt || matterResult.data.summary || extractSummary(contentHtml),
    ...matterResult.data,
  }
}
