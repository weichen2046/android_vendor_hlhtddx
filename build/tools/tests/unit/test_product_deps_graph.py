import demjson
import os
import unittest

from tests.utils import captured_output
from product_deps_graph import parse_options, Product

TEST_BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
TEST_DATA_DIR = os.path.join(TEST_BASE_DIR, 'data')


class TestParseOptions(unittest.TestCase):

    def test_parse_options(self):
        '''
        test_parse_options: $ANDROID_PRODUCT_OUT or -c must be provided
        '''
        with captured_output() as (_, err):
            with self.assertRaises(SystemExit) as cm:
                parse_options([])
            exception = cm.exception
            err_msg = err.getvalue()
            self.assertIn(
                'Environment variable $ANDROID_PRODUCT_OUT or parameter "-c" should be provided.', err_msg)
            self.assertEquals(2, exception.code)

    def test_parse_options_2(self):
        '''
        test_parse_options: -c whatever/path/
        '''
        args_to_parse = ['-c', 'whatever/path/']
        args = parse_options(args_to_parse)
        self.assertEquals(args_to_parse[1], args.prod_out_dir)
        self.assertEquals('all', args.filter_type)

    def test_parse_options_3(self):
        '''
        test_parse_options: -c whatever/path/ -t apk
        '''
        args_to_parse = ['-c', 'whatever/path/', '-t', 'apk']
        args = parse_options(args_to_parse)
        self.assertEquals(args_to_parse[1], args.prod_out_dir)
        self.assertEquals(args_to_parse[3], args.filter_type)

    def test_parse_options_4(self):
        '''
        test_parse_options: with $ANDROID_PRODUCT_OUT set
        '''
        args_to_parse = []
        os.environ['ANDROID_PRODUCT_OUT'] = 'whatever/path/'
        args = parse_options(args_to_parse)
        self.assertEquals(os.environ['ANDROID_PRODUCT_OUT'], args.prod_out_dir)
        self.assertEquals('all', args.filter_type)
        del os.environ['ANDROID_PRODUCT_OUT']

    def test_parse_options_5(self):
        '''
        test_parse_options: with $ANDROID_PRODUCT_OUT set, and parameters -c parameter/path/ -t apk
        '''
        args_to_parse = ['-c', 'parameter/path/', '-t', 'apk']
        os.environ['ANDROID_PRODUCT_OUT'] = 'environment/path/'
        self.assertIsNotNone(os.environ.get('ANDROID_PRODUCT_OUT'))
        args = parse_options(args_to_parse)
        self.assertEquals(args_to_parse[1], args.prod_out_dir)
        self.assertEquals('apk', args.filter_type)
        del os.environ['ANDROID_PRODUCT_OUT']
        self.assertIsNone(os.environ.get('ANDROID_PRODUCT_OUT'))


class TestProduct(unittest.TestCase):

    def test_get_product_out(self):
        data_f = os.path.join(TEST_DATA_DIR, 'product-info.json')
        prod_info = demjson.decode_file(data_f)
        p = Product(TEST_DATA_DIR, 'all')
        self.assertEquals(prod_info['host_out'], p.host_out)
        self.assertEquals(prod_info['product_out'], p.product_out)
