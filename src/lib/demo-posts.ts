import { Post } from './types'

export const DEMO_IMAGE_POSTS: Post[] = [
  {
    id: 'd-new2', created_at: '2026-04-18T12:00:00Z', author_name: 'King Boaz',
    title: 'The Field Receives', content: null,
    image_url: '/gallery/the-field-receives.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd-new1', created_at: '2026-04-18T11:00:00Z', author_name: 'King Boaz',
    title: 'The Pull', content: null,
    image_url: '/gallery/the-pull.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd0', created_at: '2026-04-16T10:00:00Z', author_name: 'King Boaz',
    title: 'Eyes in the Threshold', content: null,
    image_url: '/gallery/eyes-in-the-threshold.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd1', created_at: '2026-04-12T14:22:00Z', author_name: 'King Boaz',
    title: 'The Dancer', content: null,
    image_url: '/gallery/IMG_5616.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd2', created_at: '2026-04-12T13:00:00Z', author_name: 'King Boaz',
    title: 'The Eye', content: null,
    image_url: '/gallery/IMG_5615.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd3', created_at: '2026-04-12T12:00:00Z', author_name: 'King Boaz',
    title: 'Seeing', content: null,
    image_url: '/gallery/IMG_5614.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd4', created_at: '2026-04-12T11:00:00Z', author_name: 'King Boaz',
    title: 'Language of the In-Between', content: null,
    image_url: '/gallery/IMG_5634.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd5', created_at: '2026-04-13T10:00:00Z', author_name: 'King Boaz',
    title: 'This Is Love', content: null,
    image_url: '/gallery/IMG_5632.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd6', created_at: '2026-04-13T09:00:00Z', author_name: 'King Boaz',
    title: 'Compass', content: null,
    image_url: '/gallery/IMG_5629.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd7', created_at: '2026-04-13T08:00:00Z', author_name: 'King Boaz',
    title: 'Expression', content: null,
    image_url: '/gallery/IMG_5631.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd8', created_at: '2026-04-13T07:00:00Z', author_name: 'King Boaz',
    title: 'Marks', content: null,
    image_url: '/gallery/IMG_5630.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd9', created_at: '2026-04-13T06:00:00Z', author_name: 'King Boaz',
    title: 'Merkaba', content: null,
    image_url: '/gallery/IMG_4480.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
]

export const DEMO_TEXT_POSTS: Post[] = [
  {
    id: 'w1', created_at: '2026-04-12T10:00:00Z', author_name: 'River',
    title: 'The Door Was Made of Light',
    content: 'There was this door. Made of light but not the blinding kind, more like morning light coming through curtains. I walked through it and there was another version of me on the other side. She looked happy. Actually happy. I started crying when I came out of the session because I realized I haven\'t felt like that in a really long time.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w2', created_at: '2026-04-11T20:15:00Z', author_name: 'Sol',
    title: 'Small Things',
    content: 'the kettle whistles\nand i think\nokay, i\'m still here\nstill soft somehow\nstill mine',
    image_url: null, post_type: 'text', category: 'poetry', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w3', created_at: '2026-04-10T11:30:00Z', author_name: 'Anonymous',
    title: 'I Forgave My Mother',
    content: 'It didn\'t happen all at once. During the second session I saw her as a little kid, maybe 7 or 8, and she was scared. I don\'t know where that image came from but I couldn\'t stay as angry after that. There\'s still stuff I\'m working through. But something in my chest loosened that I didn\'t even know was tight.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w4', created_at: '2026-04-09T08:45:00Z', author_name: 'Elara',
    title: 'When I Was The Ocean',
    content: 'I know this sounds weird but at some point I just became the ocean. Not like a metaphor, it actually felt that way. I wasn\'t a person anymore, I was just water moving. There was nothing heavy in it. No anxiety, nothing. Just this feeling of going along with everything. I keep trying to remember what that felt like.',
    image_url: null, post_type: 'text', category: 'story', status: 'approved', moderator_notes: null,
  },
]

export const ALL_DEMO_POSTS: Post[] = [...DEMO_IMAGE_POSTS, ...DEMO_TEXT_POSTS]
