import React, { useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  hasNext: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNext, hasNext }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    const fallbackUrls: { [key: string]: string } = {
      '/images/portfolio/ecommerce-platform.jpg': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      '/images/portfolio/saas-dashboard.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      '/images/portfolio/learning-management.jpg': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      '/images/portfolio/real-estate-portal.jpg': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      '/images/portfolio/fitness-app.jpg': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      '/images/portfolio/food-delivery-app.jpg': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
      '/images/portfolio/banking-app.jpg': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      '/images/portfolio/social-media-app.jpg': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      '/images/portfolio/seo-campaign.jpg': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      '/images/portfolio/social-media-marketing.jpg': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      '/images/portfolio/ppc-campaign.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      '/images/portfolio/content-marketing.jpg': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      '/images/portfolio/tech-startup-branding.jpg': 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
      '/images/portfolio/restaurant-branding.jpg': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      '/images/portfolio/fashion-brand-campaign.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      '/images/portfolio/corporate-rebranding.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      '/images/portfolio/healthcare-system.jpg': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      '/images/portfolio/crypto-trading.jpg': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop',
      '/images/portfolio/influencer-platform.jpg': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      '/images/portfolio/luxury-hotel-branding.jpg': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    };
    
    const fallbackUrl = fallbackUrls[target.src.split(window.location.origin)[1]] || 'https://placehold.co/600x400/1e293b/84cc16?text=Project+Image';
    target.src = fallbackUrl;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web-development':
        return 'bi-code-slash';
      case 'mobile-development':
        return 'bi-phone';
      case 'digital-marketing':
        return 'bi-graph-up-arrow';
      case 'branding':
        return 'bi-palette';
      default:
        return 'bi-folder';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'web-development':
        return 'Web Development';
      case 'mobile-development':
        return 'Mobile Development';
      case 'digital-marketing':
        return 'Digital Marketing';
      case 'branding':
        return 'Branding';
      default:
        return 'Project';
    }
  };

  const handleStartSimilar = () => {
    const phoneNumber = '+447756183484';
    const message = `Hello! I'm interested in starting a similar ${getCategoryName(project.category).toLowerCase()} project like "${project.title}". Can we discuss the details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-dark-800 rounded-2xl w-full max-w-2xl aspect-square overflow-y-auto border border-dark-700 flex flex-col">
        {/* Header */}
        <div className="relative flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover rounded-t-2xl"
            onError={handleImageError}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-dark-900 transition-colors"
          >
            <i className="bi bi-x-lg"></i>
          </button>
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 bg-lime-500/20 text-lime-400 text-sm rounded-full flex items-center">
              <i className={`${getCategoryIcon(project.category)} mr-1`}></i>
              {getCategoryName(project.category)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-3">
            {project.title}
          </h2>
          
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <i className="bi bi-gear mr-2 text-lime-400"></i>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-dark-700 text-gray-300 rounded-lg border border-dark-600 hover:border-lime-400/50 transition-colors text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <i className="bi bi-check-circle mr-2 text-lime-400"></i>
              Key Features
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {project.features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-300 text-sm"
                >
                  <i className="bi bi-arrow-right text-lime-400 mr-2"></i>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 flex-shrink-0">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleStartSimilar}
              className="flex items-center justify-center px-6 py-3 bg-lime-500 text-dark-900 font-semibold rounded-lg hover:bg-lime-400 transition-colors"
            >
              <i className="bi bi-whatsapp mr-2"></i>
              Start Similar
            </button>
            {hasNext && (
              <button
                onClick={onNext}
                className="flex items-center justify-center px-6 py-3 border-2 border-lime-400 text-lime-400 font-semibold rounded-lg hover:bg-lime-400 hover:text-dark-900 transition-colors"
              >
                <i className="bi bi-arrow-right mr-2"></i>
                View Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
