import { NeuralTheme } from "@/components/theme-neural"
import { getSortedPostsData } from "@/lib/blog"

export default async function Page() {
  // Fetch the real blog posts from the file system
  const posts = await getSortedPostsData()

  return <NeuralTheme initialBlogs={posts} />
}
