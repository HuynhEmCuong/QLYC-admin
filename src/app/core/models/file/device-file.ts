import { Device } from '../categogy/device';
import { FileViewModel } from './file';

export class DeviceFile {
  Id: number;
  DeviceId: number;
  FileId: number;
  Device: Device;
  File: FileViewModel;
}
