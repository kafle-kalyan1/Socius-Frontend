import { Card } from 'antd';
import APICall from '/src/Library/API/APICall';
import React, { useState, useEffect } from 'react';

const ReportPost = () => {
  const [posts, setPosts] = useState([]);
  const [showMoreReports, setShowMoreReports] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await APICall('/api/posts/getReportedPosts/', 'GET', {});
    setPosts(response.data);
  };

  const deletePost = (postId) => {
    // Implement delete post logic here
  };

  const removeReports = (postId) => {
    // Implement remove reports logic here
  };

  const sendStrongWarning = (postId) => {
    // Implement send strong warning logic here
  };

  const toggleShowMoreReports = (postId) => {
    setShowMoreReports((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center ml-0 w-full h-full bg-cardBg2 dark:bg-darkcardBg2 font-primary_font text-text1 mt-2 dark:text-text2">
     <div
     title="Reported Posts"
     className='block p-8 h-full w-4/5 bg-cardBg2 dark:bg-darkcardBg2 font-primary_font text-text1 dark:text-text2 '
     >
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-10">
              <div className="post-content">
                <p className="text-gray-800 dark:text-gray-200 line-clamp-2">{post.text_content}</p>
                {post.images && post.images.length > 0 && (
                  <div className="post-images mt-2">
                    {post.images.map((image, index) => (
                      <img key={index} src={image} alt="Post Image" className="w-full h-auto rounded-lg" />
                    ))}
                  </div>
                )}
              </div>
              <div className="post-details mt-2 flex justify-between items-center w-full">
                <div className='w-full'>
                  <p className="text-gray-600 dark:text-gray-400">Posted by: {post.user.user_detail?.fullname}</p>
                  <p className="text-gray-600 dark:text-gray-400">Reports: {post.reports.length}</p>
                  {post.reports.length > 0 && (
                    <div className="reports-list mt-2">
                      {post.reports.slice(0, 2).map((report, index) => (
                        <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 mb-2">
                          <p className="text-gray-800 dark:text-gray-200">{report.report_reason}</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Reported by: {report.reported_by_profile.fullname}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
                {post.reports.length > 2 && (
                  <button
                    onClick={() => toggleShowMoreReports(post.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {showMoreReports[post.id] ? 'Show less reports' : 'Show more reports'}
                  </button>
                )}
              {showMoreReports[post.id] && (
                <div className="additional-reports mt-2">
                  {post.reports.slice(2).map((report, index) => (
                    <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 mb-2">
                      <p className="text-gray-800 dark:text-gray-200">{report.report_reason}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Reported by: {report.reported_by_profile.fullname}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="post-actions mt-4 flex justify-between">
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Post
                </button>
                <button
                  onClick={() => removeReports(post.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove Reports
                </button>
                <button
                  onClick={() => sendStrongWarning(post.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send Strong Warning
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
     </div>
    </div>
  );
};

export default ReportPost;