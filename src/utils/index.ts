import * as _ from 'lodash';
export interface IBuildProp {
  valueName: string;
  mapName: string;
}
export const buildProperties = (_values: any, props: IBuildProp[]) => {
  const values = { ..._values };
  props.forEach((prop) => {
    values[prop.mapName] = _.cloneDeep(values[prop.valueName]);
    delete values[prop.valueName];
  });
  return values;
};
