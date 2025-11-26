import { NeuralTheme } from "@/components/theme-neural"
import { getSortedPostsData } from "@/lib/blog"

export default async function BlogListPage() {
  const posts = await getSortedPostsData()
  return <NeuralTheme initialBlogs={posts} initialActiveTab="blogs" />
}
