// src/components/EditPost/EditPost.js

import React, { useState, useContext } from "react";
import { Modal, Input, Button, Form } from "antd";
import APICall from "../../Library/API/APICall";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";

const EditPost = ({ post, visible, onClose, afterEdit }) => {
  const { profile } = useContext(ProfileContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async (values) => {
    setLoading(true);
    const response = await APICall('/api/posts/editPost/', 'POST', { ...values, post_id: post.id });
    setLoading(false);
    if (response.status === 200) {
      afterEdit(response.data);
      onClose();
    } else {
      // handle error
    }
  };

  return (
    <Modal
      title="Edit Post"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSave} initialValues={{ text: post.postText, images: post.images }}>
        <Form.Item name="text" rules={[{ required: true, message: 'Post content is required' }]}>
          <Input.TextArea rows={4} placeholder="Edit your post" />
        </Form.Item>
        <Form.Item name="images">
          <Input placeholder="Edit your images" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          <Button type="default" onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPost;
