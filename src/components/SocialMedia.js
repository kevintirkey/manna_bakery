import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 30px 10px;
  padding: 10px 30px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.6s ease;

  &:hover {
    transform: scale(1.25);
  }
`;

const PostVideo = styled.video`
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.6s ease;

  &:hover {
    transform: scale(1.25);
  }
`;

const Placeholder = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const SocialMedia = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = 'IGQWRNUDIwdlh0OW9fY3AtSHB3U3YtaTBUWUdvUVdQVE44ejNNNlBpR0h5aXJvS3FvdUdtUGpvcVNYN3RhVHJxRWgxNXlWWi1QUmpvWmxDX0hUMTZASejRJMkwwcEE0RDJURnFldjM0YlloOF9oTXhjZAHRvZAmVqTnMZD'; // Replace with your access token

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}`);
        console.log("response data", res.data);

        // Filter for image and video posts
        const filteredPosts = res.data.data.filter(post => 
          post.media_type === 'IMAGE' || 
          post.media_type === 'CAROUSEL_ALBUM' || 
          post.media_type === 'VIDEO'
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching Instagram posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Social Media</h2>
      {loading ? (
        <FeedContainer>
          {/* Placeholder to show while loading */}
          {[...Array(13)].map((_, index) => (
            <Placeholder key={index} />
          ))}
        </FeedContainer>
      ) : (
        <FeedContainer>
          {posts.map((post) => (
            <a href={post.permalink} key={post.id} target="_blank" rel="noopener noreferrer">
              {post.media_type === 'VIDEO' ? (
                <PostVideo controls>
                  <source src={post.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </PostVideo>
              ) : (
                <PostImage src={post.media_url} alt="Instagram post" />
              )}
            </a>
          ))}
        </FeedContainer>
      )}
    </div>
  );
};

export default SocialMedia;
