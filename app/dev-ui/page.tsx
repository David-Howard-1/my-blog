"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import PostActionsBar from "@/components/ui/PostActionsBar";
import React, { useState } from "react";

const DevUIPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleClosedModal = () => setShowModal(false);

  return (
    <div className='mx-auto space-y-16'>
      <div id='buttons'>
        <h1 className='text-2xl font-black mb-5'>Buttons</h1>
        <ul className='flex space-x-4'>
          <li>
            <h2 className='font-semibold text-stone-400 uppercase text-sm'>
              Primary
            </h2>
            <Button>Save</Button>
          </li>
          <li>
            <h2 className='font-semibold text-stone-400 uppercase text-sm'>
              Secondary
            </h2>
            <Button variant='secondary'>Cancel</Button>
          </li>
          <li>
            <h2 className='font-semibold text-stone-400 uppercase text-sm'>
              Info
            </h2>
            <Button variant='info'>More Information</Button>
          </li>
          <li>
            <h2 className='font-semibold text-stone-400 uppercase text-sm'>
              Danger
            </h2>
            <Button variant='danger'>Delete</Button>
          </li>
        </ul>
      </div>
      <div id='misc'>
        <h1 className='text-2xl font-black mb-5'>Misc</h1>
        <ul className='flex space-x-4'>
          <li>
            <h2 className='font-semibold text-stone-400 uppercase text-sm'>
              Post Actions Bar
            </h2>
            <PostActionsBar postId={9} />
          </li>
          <li>
            <h2 className='font-semibold text-stone-400 uppercase text-sm'>
              Modal
            </h2>
            <Button variant='info' className='' onClick={handleOpenModal}>
              Open Modal
            </Button>
            <Modal
              header='Confirm'
              isOpen={showModal}
              onClose={handleClosedModal}
            >
              <p>Are you sure you want to delete this post?</p>
              <div className='flex ml-auto space-x-1 mt-10'>
                <Button variant='secondary' onClick={handleClosedModal}>
                  Cancel
                </Button>
                <Button variant='danger'>Delete</Button>
              </div>
            </Modal>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DevUIPage;
