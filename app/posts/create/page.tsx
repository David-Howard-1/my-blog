import ClientSideForm from '@/components/form-no-zod/ClientSideForm';
import Form from '@/components/form-no-zod/Form';
import { Toaster } from 'react-hot-toast';

const CreatePostsPage = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">New Post</h2>
      <Form />
      {/* <ClientSideForm /> */}
    </>
  );
};

export default CreatePostsPage;
