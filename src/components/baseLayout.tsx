import style from './index.module.less';

function BaseLayout() {
console.log('123456789'.replace(/^-?\d+(,\d{3})*(\.\d{1,2})?$/, ','));
  return (
    <div className={style.base_layout}>base收拾收飒飒拾</div>
  );
}
export default BaseLayout;
