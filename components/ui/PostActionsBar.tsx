'use client';

import { FC, useState } from 'react';
import ButtonLink from './ButtonLink';
import { useRouter } from 'next/navigation';
import Button from './Button';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { revalidatePath } from 'next/cache';

type Props = {
  postId: number;
};

const PostActionsBar: FC<Props> = ({ postId }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setShowModal(true);
  const handleClosedModal = () => setShowModal(false);

  return (
    <>
      <div className="flex space-x-2">
        <ButtonLink href={`/api/posts/${String(postId)}/update`} variant="info">
          Edit
        </ButtonLink>
        <Button
          className="flex space-x-1 items-center"
          variant="danger"
          onClick={handleOpenModal}
        >
          <span>Delete Post</span>
        </Button>
      </div>
      <Modal isOpen={showModal} onClose={handleClosedModal} header="Confirm">
        <p>Are you sure you want to delete this post?</p>
        <div className="flex ml-auto space-x-1 mt-10">
          <Button variant="secondary" onClick={handleClosedModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              const res = await toast.promise(
                fetch(`/api/posts?id=${String(postId)}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }),
                {
                  loading: 'Deleting post...',
                  success: 'Post Deleted successfully',
                  error: 'Unable to Delete Post',
                }
              );

              router.replace('/');
              router.refresh();
              return res.json();
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PostActionsBar;
