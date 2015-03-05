;(function () {
    describe('text-truncate directive', function () {
        var elem, scope;

        beforeEach(module('alv-ch-ng.text-truncate', 'pascalprecht.translate', function ($translateProvider) {
            $translateProvider.translations('en', {
                "common_text_truncate_more":"More",
                "common_text_truncate_less":"Less"
            })
            .translations('de', {
                    "common_text_truncate_more":"mehr",
                    "common_text_truncate_less":"weniger"
            });
            $translateProvider.preferredLanguage('en');
        }));

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope;
            scope.longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper augue vel scelerisque egestas. Praesent odio lacus, porta vitae nisl a, semper tempor elit. Etiam fringilla ut nisl non dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eros euismod, elementum tortor ut, sagittis felis. Nulla lectus ante, eleifend non felis pharetra, porta aliquet urna. Curabitur nec elit sit amet tortor accumsan volutpat sed vitae ante. Cras semper consequat nunc, in tincidunt dolor scelerisque eget. Morbi volutpat quis est bibendum aliquet. Sed euismod neque nisl, congue fermentum eros sagittis sit amet. Nulla at tincidunt nibh.";
            elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-chars-threshold="40"></p></div>');
            $compile(elem)(scope);
            scope.$digest();
        }));

        it('renders the element as required, truncates the text after 40 characters.',
            function() {
                inject(function ($translate) {
                    scope.$digest();

                    expect(elem.children('p')).toContainText('Lorem ipsum dolor sit amet, consectetur ');
                    expect(elem.find('span')).toContainText('More');
                    expect(elem.find('span')).toContainText('Less');

                    $translate.use('de');
                    scope.$digest();

                    expect(elem.find('span')).toContainText('mehr');
                    expect(elem.find('span')).toContainText('weniger');

                    //controller.toggleShow();
                });
            }
        );

        it('renders the element as required, doesnt truncates the text after 40 characters because ng-tt-chars-threshold is not a integer',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-chars-threshold="test"></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText(scope.longText);
                });
            }
        );

        it('renders the element as required, truncates the text after 40 characters and doesnt show a toggle link.',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-chars-threshold="40" ng-tt-no-toggling></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText('Lorem ipsum dolor sit amet, consectetur ');
                    expect(elem.find('span')).not.toContainText('More');
                    expect(elem.find('span')).not.toContainText('Less');
                });
            }
        );

        it('renders the element as required, doesnt truncates the text because there are less characters than threshold and doesnt show a toggle link.',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-chars-threshold="4000" ng-tt-no-toggling></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText('Lorem ipsum dolor sit amet, consectetur ');
                    expect(elem.find('span')).not.toContainText('More');
                    expect(elem.find('span')).not.toContainText('Less');
                });
            }
        );

        it('renders the element as required, truncates the text after 15 words.',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-words-threshold="15"></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper augue vel scelerisque egestas. Praesent');
                    expect(elem.find('span')).toContainText('More');
                    expect(elem.find('span')).toContainText('Less');
                });
            }
        );

        it('renders the element as required, truncates the text after 15 words and doesnt show a toggle link..',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-words-threshold="15" ng-tt-no-toggling></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper augue vel scelerisque egestas. Praesent');
                    expect(elem.find('span')).not.toContainText('More');
                    expect(elem.find('span')).not.toContainText('Less');
                });
            }
        );

        it('renders the element as required, doesnt truncates the text because there are less words than threshold and doesnt show a toggle link..',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-words-threshold="1500" ng-tt-no-toggling></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper augue vel scelerisque egestas. Praesent');
                    expect(elem.find('span')).not.toContainText('More');
                    expect(elem.find('span')).not.toContainText('Less');
                });
            }
        );

        it('renders the element as required with custom toggle labels.',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-words-threshold="15" ng-tt-more-label="Show" ng-tt-less-label="Hide"></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper augue vel scelerisque egestas. Praesent');
                    expect(elem.find('span')).toContainText('Show');
                    expect(elem.find('span')).toContainText('Hide');
                    expect(elem.find('span')).not.toContainText('More');
                    expect(elem.find('span')).not.toContainText('Less');
                });
            }
        );

        it('renders the element as required, but doesnt truncates the text after 15 words because ng-tt-words-threshold is not a integer.',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div><p ng-text-truncate="longText" ng-tt-words-threshold="test"></p></div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('p')).toContainText(scope.longText);
                });
            }
        );

        describe('throw error if there is no threshold attribute', function() {
            var err_msg = '';

            it('error no ng-tt-*-threshold',
                function() {
                    inject(function ($compile) {
                        elem = angular.element('<div><p ng-text-truncate="longText"></p></div>');
                        try {
                            $compile(elem)(scope);
                        }
                        catch(error) {
                            err_msg = error;
                        }
                        scope.$digest();

                        expect(err_msg).toEqual('You must specify one, and only one, type of threshould (chars or words)');
                    });
                }
            );
        });

/*
        it('check scrollToc function.', function () {
            spyOn(scope, '$broadcast').and.callThrough();
            scope.scrollToc('title1');
            scope.$digest();
            expect(scope.$broadcast).toHaveBeenCalledWith('alv-ch-ng:dom-manipulate', {'id':'toc','event':'toc:scrollToc'});
        });

        it('renders the element as required (language changed from en to de).',
            function() {
                inject(function ($translate) {
                    $translate.use('de');
                    scope.$digest();

                    expect(elem.children('#toc')).toBeTruthy();
                    expect(elem.children('#toc').children('span')).toContainText('Inhalt');
                    expect(elem.children('#toc').children('.toc-list')).toBeTruthy();
                    expect(elem.children('#toc').children('.toc-list').children('li')).toBeTruthy();
                });
            }
        );

        it('renders the element with default selector as required.',
            function() {
                inject(function ($compile) {
                    elem = angular.element('<div>'+
                    '<toc></toc>'+
                    '<div>'+
                    '<h1 class="toc-item">Title 1</h1>'+
                    '<h1 class="toc-item">Title 2</h1>'+
                    '</div>'+
                    '</div>');
                    $compile(elem)(scope);
                    scope.$digest();

                    expect(elem.children('#toc')).toBeTruthy();
                    expect(elem.children('#toc').children('span')).toContainText('Contents');
                    expect(elem.children('#toc').children('.toc-list')).toBeTruthy();
                    expect(elem.children('#toc').children('.toc-list').children('li')).toBeTruthy();
                });
            }
        );
*/
    });
}());