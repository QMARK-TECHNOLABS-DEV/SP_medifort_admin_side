import { useState } from 'react';
import { getBrochures, uploadBrochures } from '../../utils/Endpoint';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../useAxiosPrivate';

const useBrochures = () => {
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivateHook = useAxiosPrivate();
  // Fetch all Brochures
  const fetchBrochures = async () => {
    setLoading(true);
    try {
        const response = await axiosPrivateHook.get(getBrochures);
        setBrochures(response.data.result); // Ensure Brochures is an array
    } catch (err) {
        setError(err);
        toast.error('Failed to fetch Brochures');
    } finally {
        setLoading(false);
    }
};
 
  // Delete an Brochure
  const deleteBrochure = async (brochureId) => {
    setLoading(true);
    try {
      await axiosPrivateHook.delete(`${uploadBrochures}/${brochureId}`);
      setBrochures((prevBrochures) =>
        prevBrochures.filter((brochure) => brochure.id !== brochureId)
      );
      toast.success('Brochure deleted successfully');
    } catch (err) {
      setError(err);
      toast.error('Failed to delete Brochure');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of Brochures
  // useEffect(() => {
  //   fetchBrochures();
  // }, []);

  return {
    brochures,
    loading,
    error,
    deleteBrochure,
    fetchBrochures,
  };
};

export default useBrochures;
