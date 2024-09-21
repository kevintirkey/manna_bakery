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

const Post = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    const accessToken = 'IGQWRQdUJ1cldqSTduakVzVGstTlFLa0lzVEpoNnJoaml3YWdzVDZApdERwSmsIGQWRNaklUOEtqYzJTZA005SnhUZA3JDSTRNNlRPeXVWSTFfVUR1OXJncWxMQXd0YTZAhMlhOY3NPOHNmLVVFUld6NHFTcFZAMcFhUeDJ6WkRLOER2aHVRUk01U0hleTlMajdlcVNMZAXg1QVo0cHVYcEdEaE5UVGd5YncZDwSFN3UXRZANVpVM2w4cDJpdTlwNFVhVEF2YVIwMmVyLVVhd05RbFlUUFUxbHMySk9pTHNnRG50aW13OXRqLThKQ1Vza0ZAjMVRWcWMZD';

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${accessToken}`);
        console.log("response data", res.data); // Log the entire response data
        const imagePosts = res.data.data.filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' );
        setPosts(imagePosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Instagram posts', error);
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
          {[...Array(6)].map((_, index) => (
            <Placeholder key={index} />
          ))}
        </FeedContainer>
      ) : (
        <FeedContainer>
          {posts.map((post) => (
            <a href={post.permalink} key={post.id} target="_blank" rel="noopener noreferrer">
              <Post src={post.media_url} alt="Instagram post" />
            </a>
          ))}
        </FeedContainer>
      )}
    </div>
  );
};

export default SocialMedia;
