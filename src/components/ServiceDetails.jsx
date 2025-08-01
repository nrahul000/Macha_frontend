import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// Import service pages
import Sanitization from '../pages/services/Sanitization';
import MedicineDelivery from '../pages/services/MedicineDelivery';
import EventManagement from '../pages/services/EventManagement';
import OrganicProducts from '../pages/services/OrganicProducts';
import SecurityServices from '../pages/services/SecurityServices';
import TransportServices from '../pages/services/TransportServices';
import DigitalMarketing from '../pages/services/DigitalMarketing';
import HomeTutors from '../pages/services/HomeTutors';
import MedicalServices from '../pages/services/MedicalServices';
import SoftwareDevelopment from '../pages/services/SoftwareDevelopment';
import HomeKeeping from '../pages/services/HomeKeeping';
import OnlineClasses from '../pages/services/OnlineClasses';
import PackersAndMovers from '../pages/services/PackersAndMovers';
import HouseRental from '../pages/services/HouseRental';
import LunchBoxSupply from '../pages/services/LunchBoxSupply';
import FruitBoxSupply from '../pages/services/FruitBoxSupply';
import Technicians from '../pages/services/Technicians';
import Electrician from '../pages/services/Electrician';
import Plumber from '../pages/services/Plumber';
import Carpenter from '../pages/services/Carpenter';
import ACTechnician from '../pages/services/ACTechnician';

const ServiceDetails = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceType]);
  
  const renderServiceComponent = () => {
    switch(serviceType) {
      case 'medicine-delivery':
        return <MedicineDelivery />;
      case 'sanitization':
        return <Sanitization />;
      case 'event-management':
        return <EventManagement />;
      case 'organic-products':
        return <OrganicProducts />;
      case 'security-services':
        return <SecurityServices />;
      case 'transport-services':
        return <TransportServices />;
      case 'digital-marketing':
        return <DigitalMarketing />;
      case 'home-tutors':
        return <HomeTutors />;
      case 'medical-services':
        return <MedicalServices />;
      case 'software-development':
        return <SoftwareDevelopment />;
      case 'home-keeping-':  // Fixed the typo in route name
        return <HomeKeeping />;
      case 'online-classes':
        return <OnlineClasses />;
      case 'packers-and-movers':
        return <PackersAndMovers />;
      case 'house-rental':
        return <HouseRental />;
      case 'lunch-box-supply':
        return <LunchBoxSupply />;
      case 'fruit-box-supply':
        return <FruitBoxSupply />;
      case 'technicians':
        return <Technicians />;
      case 'electrician':
        return <Electrician />;
      case 'plumber':
        return <Plumber />;
      case 'carpenter':
        return <Carpenter />;
      case 'ac-technician':
        return <ACTechnician />;
      default:
        // Redirect to services page if the service type is not valid
        navigate('/services');
        return null;
    }
  };

  return (
    <div className="pt-16">
      {renderServiceComponent()}
    </div>
  );
};

export default ServiceDetails;