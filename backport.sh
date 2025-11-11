git reset HEAD~1
rm ./backport.sh
git cherry-pick a939c427ada4529d01477e3f919449cbe882b549
echo 'Resolve conflicts and force push this branch.\n\nTo backport translations run: bin/i18n/merge-translations <release-branch>'
