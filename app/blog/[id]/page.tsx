import { NeuralTheme } from "@/components/theme-neural"
import { getAllPostIds, getPostData, getSortedPostsData } from "@/lib/blog"

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    id: path.params.id,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Fetch the specific post data
  const postData = await getPostData(id)

  // Fetch all posts to pass to the theme (so the list is available if they navigate back or for the "all blogs" context)
  const allPosts = await getSortedPostsData()

  // We need to ensure the specific post data is in the allPosts array
  // (it should be, but let's make sure the content is there if the list only had summaries)
  const postsWithContent = allPosts.map((p) =>
    String(p.id) === String(id) ? { ...p, content: postData.contentHtml } : p,
  )

  return <NeuralTheme initialBlogs={postsWithContent} initialActiveTab="blogs" initialSelectedBlogId={id} />
}
