import Button from '@/components/ui/Button';
import React from 'react';

const DevUIPage = () => {
  return (
    <div className="mx-auto">
      <div>
        <h1 className="text-2xl font-black mb-5">Buttons</h1>
        <ul className="flex space-x-4">
          <li>
            <h2 className="font-semibold text-stone-400 uppercase text-sm">
              Primary
            </h2>
            <Button>Save</Button>
          </li>
          <li>
            <h2 className="font-semibold text-stone-400 uppercase text-sm">
              Secondary
            </h2>
            <Button variant="secondary">Cancel</Button>
          </li>
          <li>
            <h2 className="font-semibold text-stone-400 uppercase text-sm">
              Info
            </h2>
            <Button variant="info">More Information</Button>
          </li>
          <li>
            <h2 className="font-semibold text-stone-400 uppercase text-sm">
              Danger
            </h2>
            <Button variant="danger">Delete</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DevUIPage;
