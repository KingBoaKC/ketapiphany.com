export type PostType = 'image' | 'text'
export type PostCategory = 'art' | 'poetry' | 'journal' | 'story'
export type PostStatus = 'pending' | 'approved' | 'rejected'

export interface Post {
  id: string
  created_at: string
  author_name: string
  title: string
  content: string | null
  image_url: string | null
  post_type: PostType
  category: PostCategory
  status: PostStatus
  moderator_notes: string | null
}
