import { useEffect, useState } from 'react';
import {ChatgptResForSportDescr} from '../../util/api/chatgptResponse';
import DescripSkeleton from './DescripSkeleton';


export const DescriptionExercise = ({ slug, userId }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  let refinePrompt = `Quiero que me des una breve descripción en español sobre ${slug}`;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const resp = await ChatgptResForSportDescr({
            prompt: refinePrompt,
            user: userId
          });
          
          setDescription(resp.data.message);
        } catch (error) {
          console.error('Error creating description:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userId, slug]);

  
  return (
    <div className="mt-6">
      <h3 className="sr-only">Descripción</h3>
      {loading ? (
       <DescripSkeleton />
      ) : (
        <div
          className="space-y-6 text-base text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: description  }}
        />
      )}
    </div>
  );
};
