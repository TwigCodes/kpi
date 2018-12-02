import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

/**
 * 加载图标，包括 svg 图标和 FontAwesome 字体图标等
 *
 * @param ir a MatIconRegistry 实例，用于注册图标资源
 * @param ds a DomSanitizer 实例，用于忽略安全检查返回一个 URL
 */
export const loadIconResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const avatarDir = `assets/avatars`;
  const iconDir = `assets/icons`;
  ir.addSvgIconSetInNamespace(
    'avatars',
    ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`)
  )
    .addSvgIcon(
      'unassigned',
      ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`)
    )
    .addSvgIcon(
      'move',
      ds.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`)
    )
    .addSvgIcon(
      'room',
      ds.bypassSecurityTrustResourceUrl(`${iconDir}/room.svg`)
    )
    .addSvgIcon(
      'floor',
      ds.bypassSecurityTrustResourceUrl(`${iconDir}/floor.svg`)
    )
    .addSvgIcon(
      'json',
      ds.bypassSecurityTrustResourceUrl(`${iconDir}/json.svg`)
    )
    .registerFontClassAlias('fontawesome', 'fa');
};

export const loadAvatars = () => {
  const avatarName = 'avatars';
  return _.range(1, 16)
    .map(i => `${avatarName}:svg-${i}`)
    .reduce((r: string[], x: string) => [...r, x], []);
};
