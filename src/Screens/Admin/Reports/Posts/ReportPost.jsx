import { Avatar, Card, Collapse, Typography } from 'antd';
import APICall from '/src/Library/API/APICall';
import React, { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';
import Button from '/src/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { showLoading } from '/src/components/Loading/Loading';

const ReportPost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await APICall('/api/posts/getReportedPosts/', 'GET', {});
    setPosts(response.data);
  };

  const deletePost = async (postId) => {
   const response = await APICall(`/api/posts/deleteReportedPost/`, 'POST', {post_id: postId});
   if (response.status === 200)
   {
    toast.success('Post deleted successfully');
   }
    fetchPosts();
  };

  const removeReports = async (postId) => {
    const response = await APICall(`/api/posts/removeFakeReports/`, 'POST', {post_id: postId});
    if (response.status === 200)
    {
     toast.success('Reports deleted successfully');
    }
     fetchPosts();  };

  const sendStrongWarning = async (postId) => {
    showLoading(true);
    var response = await APICall(`/api/posts/sendwarning/?post_id=${postId}`, 'GET', {});
    if (response.status == 200)
    {
      toast.success('Warning sent successfully');
      showLoading(false);
      removeReports(postId);
    }

  };

  const viewPost = (postId) => {
    navigate(`/post/${postId}`)
  };


  const { Title, Text } = Typography;
const { Panel } = Collapse;

return (
  <div className="flex flex-col justify-center items-center ml-0 w-full h-full bg-cardBg2 dark:bg-darkcardBg2 font-primary_font text-text1 mt-2 dark:text-text2">
    <div
      className="block p-8 h-full w-4/5 bg-cardBg2 dark:bg-darkcardBg2 font-primary_font text-text1 dark:text-text2"
    >
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} className="mb-6 bg-cardBg dark:bg-darkcardBg">
            <div className="post-content">
              <div className="flex items-center mb-4 ">
                <Avatar src={post.user_profile?.profile_picture} size={40} className="mr-2" />
                <div>
                  <Title level={5} className="mb-0">
                    {post.user_profile?.fullname}
                  </Title>
                  <Text type="secondary">{post.created_at}</Text>
                </div>
              </div>
              <Text>{post.text_content}</Text>
              {post.images && post.images.length > 0 && (
                <div className="post-images mt-4 flex justify-center items-center">
                  {post.images.map((image, index) => (
                    <img key={index} src={image} alt="Post Image" className="max-w-[300px] h-auto rounded-lg mb-2" />
                  ))}
                </div>
              )}
            </div>
            <div className="post-details mt-4">
              <Text type="danger" className="ml-4">
                Reports: {post.reports.length}
              </Text>
            </div>
            <Collapse className="mt-4">
              <Panel header="View Reports" key="1">
                {post.reports.map((report, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-2">
                    <div className="flex items-center mb-2">
                      <Avatar src={report.reported_by_profile.profile_picture} size={32} className="mr-2" />
                      <Text strong>{report.reported_by_profile.fullname}</Text>
                    </div>
                    <Text className="font-bold tracking-wider text-lg font-primary_font">{report.report_reason}</Text>
                  </div>
                ))}
              </Panel>
            </Collapse>
            <div className="post-actions mt-4 flex justify-evenly">
            <Button
                type="primary"
                onClick={() => viewPost(post.id)}
                text="View Post"
              />
              <Button
                type="danger"
                onClick={() => deletePost(post.id)}
                text="Delete Post"
              />
              <Button
                type="secondary"
                onClick={() => sendStrongWarning(post.id)}
                text="Send Warning"
              />
               <Button
                type="txtPrimary"
                onClick={() => removeReports(post.id)}
                text="Remove Reports"
              />
              
            </div>
          </Card>
        ))
      ) : (
        <Text>No posts available.</Text>
      )}
    </div>
  </div>
);
};

export default ReportPost;