import {
  EmployeeView,
  AdminReviewAssignView,
  AdminReviewView,
  MyReviewView,
} from '../../../components'

export const getRelevantViewComponent = (viewId) => {
  switch (viewId) {
    case 'emp':
      return <EmployeeView />;
    case 'rvw':
      return <AdminReviewView />;
    case 'asrvw':
      return <AdminReviewAssignView />;
    case 'myrvw':
      return <MyReviewView />;
    default:
      return null;  
  }
};