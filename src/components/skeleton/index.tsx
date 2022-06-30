import { ReactElement } from 'react';
import './skeleton.css';

const createSkeleton = (child: ReactElement, depth: number, current: number) => {
  const { props } = child;

  if (depth <= current || !props) {
    return null;
  }

  if (Array.isArray(props.children) && current < depth - 1) {
    return (
      <div
        className={`${props.className || ''} ${'skeleton-container'}`}
        style={props['skeleton-style'] || {}}
        key={Math.random() * 1000}
      >
        {props.children.length > 0 ? props.children.map((cItem: any) => createSkeleton(cItem, depth, current + 1)) : '*'}
      </div>
    );
  }
  return (
    <div
      className={`${props.className ? props.className : ''} ${'skeleton-item'}`}
      style={props['skeleton-style'] || {}}
      key={Math.random() * 1000}
    >
      *
    </div>
  );
};

interface Props {
  isVisible: boolean;
  children: ReactElement | ReactElement[];
}
const Skeleton = (props: Props) => {
  const { isVisible, children } = props;
  if (!props) {
    return null;
  }
  if (isVisible) {
    if (Array.isArray(children)) {
      return <>{children.map((el) => createSkeleton(el, 4, 0))}</>;
    }
    return createSkeleton(children, 4, 0);
  }
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((el) => el)}
      </>
    );
  }
  return children;
};

export default Skeleton;
